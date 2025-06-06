import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CirclePlus as PlusCircle } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  description: string;
  showAddButton?: boolean;
}

export function EmptyState({ title, description, showAddButton = false }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {showAddButton && (
        <View style={styles.iconContainer}>
          <PlusCircle size={48} color="#D1D5DB" />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});