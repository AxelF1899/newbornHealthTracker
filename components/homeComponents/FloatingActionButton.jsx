import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';

const FloatingActionButton = ({ onPress }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };

  return (
    <Animated.View style={[styles.fabContainer, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.fab}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <Image source={require('../../static/images/add.png')} style={styles.fabImage} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 15,
  },
  fab: {
    backgroundColor: '#00A49B',
    width: 55,
    height: 55,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabImage: {
    width: 29,  
    height: 29, 
    resizeMode: 'contain',
  },
});

export default FloatingActionButton;
