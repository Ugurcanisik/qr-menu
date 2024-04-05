import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CiroModule } from './ciro/ciro.module';
import { StaffModule } from './staff/staff.module';
import { UsersModule } from './users/users.module';
import { TypeexpensesModule } from './typeexpenses/typeexpenses.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CategoriesModule,
    CiroModule,
    StaffModule,
    UsersModule,
    TypeexpensesModule,
    ExpensesModule,
    ProductsModule,
    SettingsModule,
    AuthModule,
    DashboardModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
