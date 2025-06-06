import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionItem } from '@/components/TransactionItem';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { useTransactions } from '@/hooks/useTransactions';

export default function Dashboard() {
  const { 
    transactions, 
    loading, 
    deleteTransaction, 
    getTotalBalance, 
    getMonthlyIncome, 
    getMonthlyExpenses 
  } = useTransactions();

  if (loading) {
    return <LoadingSpinner />;
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Here's your financial overview</Text>
        </View>

        <BalanceCard
          balance={getTotalBalance()}
          monthlyIncome={getMonthlyIncome()}
          monthlyExpenses={getMonthlyExpenses()}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
              />
            ))
          ) : (
            <EmptyState
              title="No transactions yet"
              description="Start by adding your first transaction to track your finances"
              showAddButton={true}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
    marginHorizontal: 16,
  },
});