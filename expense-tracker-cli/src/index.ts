import * as readline from 'readline'; // Fixes 'Cannot find name readline'
import { stdin as input, stdout as output } from 'process';
import pc from 'picocolors';
import { ExpenseManager } from './services/expense.manager.js';
import { Category, PaymentMethod } from './constants/enums.js';

const manager = new ExpenseManager();
const rl = readline.promises.createInterface({ input, output });

async function mainMenu() {
  console.clear();
  console.log(pc.bold(pc.cyan("=== 💼 EXPENSE TRACKER CLI ===")));
  console.log("1. Add Expense");
  console.log("2. View All Expenses");
  console.log("3. View Summaries");
  console.log("4. Delete Expense");
  console.log("5. Exit\n");

  const choice = await rl.question("Choose an option (1-5): ");

  switch (choice.trim()) {
    case '1':
      await handleAdd();
      break;
    case '2':
      await handleView();
      break;
    case '3':
      await handleSummary();
      break;
    case '4':
      await handleDelete();
      break;
    case '5':
      console.log(pc.green("Goodbye!"));
      rl.close();
      process.exit(0);
    default:
      console.log(pc.red("Invalid option. Please try again."));
  }

  await rl.question('\nPress Enter to return to main menu...');
  mainMenu();
}

async function handleAdd() {
  console.log(pc.bold("\n➕ Add New Expense"));

  // 1. Title Input & Validation
  let title = "";
  while (!title) {
    title = (await rl.question("Enter title: ")).trim();
    if (!title) console.log(pc.red("Title cannot be empty."));
  }

  // 2. Amount Input & Validation
  let amount = 0;
  while (amount <= 0 || isNaN(amount)) {
    const amtStr = await rl.question("Enter amount: ");
    amount = parseFloat(amtStr);
    if (amount <= 0 || isNaN(amount)) {
      console.log(pc.red("Amount must be a number greater than 0."));
    }
  }

  // 3. Category Choice & Validation
  const categories = Object.values(Category);
  console.log(`\nAvailable Categories: ${categories.join(', ')}`);
  let categoryInput: any = "";
  while (!categories.includes(categoryInput)) {
    categoryInput = (await rl.question("Enter category: ")).trim();
    if (!categories.includes(categoryInput)) {
      console.log(pc.red("Invalid category. Please select from the listed options."));
    }
  }

  // 4. Payment Method Choice & Validation
  const methods = Object.values(PaymentMethod);
  console.log(`\nAvailable Methods: ${methods.join(', ')}`);
  let methodInput: any = "";
  while (!methods.includes(methodInput)) {
    methodInput = (await rl.question("Enter payment method: ")).trim();
    if (!methods.includes(methodInput)) {
      console.log(pc.red("Invalid payment method. Please select from the listed options."));
    }
  }

  // 5. Date Input
  const defaultDate = new Date().toISOString().split('T')[0];
  const dateInput = await rl.question(`Enter date (YYYY-MM-DD) [Default: ${defaultDate}]: `);
  const date = dateInput.trim() || defaultDate;

  // Save Expense
  const expense = await manager.addExpense({
    title,
    amount,
    category: categoryInput as Category,
    paymentMethod: methodInput as PaymentMethod,
    date
  });

  console.log(pc.green(`\n✔ Expense added successfully! ID: ${expense.id}`));
}

async function handleView() {
  const expenses = await manager.getAllExpenses();
  if (expenses.length === 0) {
    console.log(pc.yellow("\nNo records found."));
    return;
  }
  
  console.log(pc.bold("\n📋 Expense Records:"));
  console.table(expenses.map(e => ({
    Title: e.title,
    Amount: `₹${e.amount}`,
    Category: e.category,
    Method: e.paymentMethod,
    Date: e.date
  })));
}

async function handleSummary() {
  const summary = await manager.getSummary();
  if (!summary) {
    console.log(pc.yellow("\nNo data available to build structural summaries."));
    return;
  }
  
  console.log(pc.bold(pc.underline("\n📊 Financial Summary")));
  console.log(`Total Spent:     ${pc.green(`₹${summary.totalExpenses}`)}`);
  console.log(`Total Items:     ${summary.count}`);
  console.log(`Highest Spend:   ${pc.red(`₹${summary.highest}`)}`);
  console.log(`Lowest Spend:    ${pc.blue(`₹${summary.lowest}`)}`);
  console.log(`Average Expense: ₹${summary.average.toFixed(2)}`);
  
  console.log(pc.bold("\n🧾 Category Breakdown:"));
  Object.entries(summary.categoryTotals).forEach(([cat, amt]) => {
    console.log(` - ${cat}: ₹${amt}`);
  });
}

async function handleDelete() {
  console.log(pc.bold("\n❌ Delete Expense"));
  const id = await rl.question('Enter Expense ID to delete: ');
  
  const success = await manager.deleteExpense(id.trim());
  if (success) {
    console.log(pc.green("✔ Expense deleted successfully."));
  } else {
    console.log(pc.red("❌ Expense ID not found."));
  }
}

// Start CLI Application
mainMenu();
