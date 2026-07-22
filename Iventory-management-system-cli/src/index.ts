import * as p from '@clack/prompts';
import { readDatabase, writeDatabase } from './database.js';
import { InventoryManager } from './inventory.js';
import { Category } from './types.js';

const manager = new InventoryManager(readDatabase());

async function main() {
  p.intro('📦 Warehouse Inventory Management System CLI 📦');

  while (true) {
    const action = await p.select({
      message: 'Choose an inventory operation:',
      options: [
        { value: 'view', label: '📋 View All Items' },
        { value: 'restock', label: '➕ Restock Product' },
        { value: 'sell', label: '➖ Sell Product (Reduce Stock)' },
        { value: 'report', label: '📊 Generate Summary Report' },
        { value: 'exit', label: '❌ Exit' },
      ],
    });

    if (p.isCancel(action) || action === 'exit') {
      p.outro('Goodbye! Data saved safely.');
      break;
    }

    if (action === 'view') {
      const items = manager.getInventory();
      console.log('\n--- CURRENT INVENTORY ---');
      items.forEach(item => {
        let uniqueSpec = '';
        
        // TypeScript safely refines type here using Discriminated Unions!
        if (item.category === Category.ELECTRONICS) {
          uniqueSpec = `[Specs: ${item.voltage}V, ${item.warrantyMonths}mo Warranty]`;
        } else if (item.category === Category.CLOTHING) {
          uniqueSpec = `[Specs: Size ${item.size}, Mat: ${item.material}]`;
        } else if (item.category === Category.FOOD) {
          uniqueSpec = `[Specs: Expires ${item.expiryDate}]`;
        }

        console.log(`ID: ${item.id} | ${item.name} (${item.category}) - Price: $${item.price} | Stock: ${item.stock} ${uniqueSpec}`);
      });
      console.log('-------------------------\n');
    }

    if (action === 'restock') {
      const id = await p.text({ message: 'Enter Product ID to restock:' });
      if (p.isCancel(id)) continue;

      const product = manager.findProductById(id as string);
      if (!product) {
        p.log.error('Product ID not found.');
        continue;
      }

      const qty = await p.text({ message: `How many units of "${product.name}" are arriving?` });
      if (p.isCancel(qty)) continue;

      const parsedQty = parseInt(qty as string);
      if (isNaN(parsedQty) || parsedQty <= 0) {
        p.log.error('Invalid quantity!');
        continue;
      }

      const updated = manager.restock(id as string, parsedQty);
      writeDatabase(updated);
      p.log.success(`Successfully restocked! New quantity: ${product.stock + parsedQty}`);
    }

    if (action === 'sell') {
      const id = await p.text({ message: 'Enter Product ID to sell:' });
      if (p.isCancel(id)) continue;

      const qty = await p.text({ message: 'Enter quantity to sell:' });
      if (p.isCancel(qty)) continue;

      const parsedQty = parseInt(qty as string);
      if (isNaN(parsedQty) || parsedQty <= 0) {
        p.log.error('Invalid quantity!');
        continue;
      }

      try {
        const updated = manager.sell(id as string, parsedQty);
        writeDatabase(updated);
        p.log.success('Sale recorded successfully!');
      } catch (err: any) {
        p.log.error(err.message);
      }
    }

    if (action === 'report') {
      const report = manager.getSummaryReport();
      console.log('\n====================================');
      console.log('       WAREHOUSE SUMMARY REPORT     ');
      console.log('====================================');
      console.log(`Total stock items on floor : ${report.totalItems}`);
      console.log(`Total asset value valuation: $${report.totalValue.toLocaleString()}`);
      console.log('\nValue breakdown per category:');
      Object.entries(report.breakdown).forEach(([cat, val]) => {
        console.log(` - ${cat}: $${val.toLocaleString()}`);
      });
      console.log('====================================\n');
    }
  }
}

main().catch(console.error);