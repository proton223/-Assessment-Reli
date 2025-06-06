import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Transaction } from '@/types/finance';
import { categories } from '@/data/categories';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const category = categories.find(c => c.name === transaction.category);
  
  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(transaction.id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.categoryIcon}>{category?.icon || '💸'}</Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.category}>{transaction.category}</Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount,
          transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
        ]}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
          accessibilityLabel="Delete transaction"
          accessibilityRole="button"
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  details: {
    flex: 1,
  },
  description: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  incomeAmount: {
    color: '#10B981',
  },
  expenseAmount: {
    color: '#EF4444',
  },
  deleteButton: {
    padding: 4,
  },
});