import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react-native';

interface BalanceCardProps {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function BalanceCard({ balance, monthlyIncome, monthlyExpenses }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={[styles.balanceAmount, balance < 0 && styles.negativeBalance]}>
          {balance < 0 ? '-' : ''}{formatCurrency(balance)}
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <TrendingUp size={16} color="#10B981" />
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <Text style={styles.incomeAmount}>+{formatCurrency(monthlyIncome)}</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <TrendingDown size={16} color="#EF4444" />
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <Text style={styles.expenseAmount}>-{formatCurrency(monthlyExpenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#10B981',
  },
  negativeBalance: {
    color: '#EF4444',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  incomeAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#10B981',
  },
  expenseAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#EF4444',
  },
});