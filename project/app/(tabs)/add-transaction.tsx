import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { Check, DollarSign } from 'lucide-react-native';
import { useTransactions } from '@/hooks/useTransactions';
import { categories, getIncomeCategories, getExpenseCategories } from '@/data/categories';
import { FormErrors } from '@/types/finance';

export default function AddTransaction() {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const transactionAmount = transactionType === 'income' 
        ? parseFloat(amount) 
        : -parseFloat(amount);

      addTransaction({
        amount: transactionAmount,
        description: description.trim(),
        category: selectedCategory,
        date: new Date(),
        type: transactionType,
      });

      // Reset form
      setAmount('');
      setDescription('');
      setSelectedCategory('');
      setTransactionType('expense');
      setErrors({});

      Alert.alert(
        'Success',
        'Transaction added successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to add transaction. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const relevantCategories = transactionType === 'income' 
    ? getIncomeCategories() 
    : getExpenseCategories();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Transaction</Text>
          <Text style={styles.subtitle}>Track your income and expenses</Text>
        </View>

        {/* Transaction Type Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Type</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'expense' && styles.toggleButtonActive
              ]}
              onPress={() => {
                setTransactionType('expense');
                setSelectedCategory('');
                setErrors({});
              }}
            >
              <Text style={[
                styles.toggleButtonText,
                transactionType === 'expense' && styles.toggleButtonTextActive
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                transactionType === 'income' && styles.toggleButtonActive
              ]}
              onPress={() => {
                setTransactionType('income');
                setSelectedCategory('');
                setErrors({});
              }}
            >
              <Text style={[
                styles.toggleButtonText,
                transactionType === 'income' && styles.toggleButtonTextActive
              ]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amount</Text>
          <View style={[styles.amountContainer, errors.amount && styles.inputError]}>
            <DollarSign size={20} color="#6B7280" />
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                if (errors.amount) {
                  setErrors(prev => ({ ...prev, amount: undefined }));
                }
              }}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.textInput, errors.description && styles.inputError]}
            placeholder="Enter description..."
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: undefined }));
              }
            }}
            placeholderTextColor="#9CA3AF"
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {relevantCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.categoryButtonSelected
                ]}
                onPress={() => {
                  setSelectedCategory(category.name);
                  if (errors.category) {
                    setErrors(prev => ({ ...prev, category: undefined }));
                  }
                }}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.name && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
                {selectedCategory === category.name && (
                  <View style={styles.selectedIndicator}>
                    <Check size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Adding...' : 'Add Transaction'}
          </Text>
        </TouchableOpacity>
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
  title: {
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
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  toggleButtonTextActive: {
    color: '#111827',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#111827',
    marginLeft: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '30%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  categoryButtonSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#10B981',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});