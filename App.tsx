import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import KanjiCard from './src/components/KanjiCard';
import { deck } from './src/deck';

const { width, height } = Dimensions.get('window');

// --- Card and deck layout constants ---
const CARD_WIDTH     = 300;
const CARD_HEIGHT    = 400;
const INITIAL_SCALE  = 0.3;
const DECK_WIDTH     = CARD_WIDTH * INITIAL_SCALE;
const DECK_HEIGHT    = CARD_HEIGHT * INITIAL_SCALE;
const DECK_X         = (width  - DECK_WIDTH) / 2;
const DECK_Y         = height / 2 + 20;
const CARD_TARGET_X  = (width  - CARD_WIDTH) / 2;
const CARD_TARGET_Y  = 20;

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);

  // --- Animation state ---
  const animX     = useRef(new Animated.Value(DECK_X)).current;
  const animY     = useRef(new Animated.Value(DECK_Y)).current;
  const animScale = useRef(new Animated.Value(INITIAL_SCALE)).current;

  // --- Handles drawing a new card and animating it into view ---
  const drawCard = () => {
    const index = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(index);

    animX.setValue(DECK_X);
    animY.setValue(DECK_Y);
    animScale.setValue(INITIAL_SCALE);

    Animated.parallel([
      Animated.timing(animX, {
        toValue: CARD_TARGET_X,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(animY, {
        toValue: CARD_TARGET_Y,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(animScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Divider line for layout orientation */}
      <View style={styles.divider} />

      {/* Deck stack with visual depth */}
      <View style={[styles.deckContainer, { left: DECK_X, top: DECK_Y }]}>
        {[3, 2, 1].map(i => (
          <View
            key={i}
            style={[
              styles.deckShadow,
              {
                top: i * 4,
                left: i * 2,
                width: DECK_WIDTH,
                height: DECK_HEIGHT,
              },
            ]}
          />
        ))}
        {/* Draw button */}
        <TouchableOpacity
          style={[styles.deckFace, { width: DECK_WIDTH, height: DECK_HEIGHT }]}
          onPress={drawCard}
          activeOpacity={0.8}
        >
          <Text style={styles.deckText}>Draw</Text>
        </TouchableOpacity>
      </View>

      {/* Active card animation layer */}
      {currentCardIndex !== null && (
        <Animated.View
          key={currentCardIndex}
          style={[
            styles.cardWrapper,
            {
              transform: [
                { translateX: animX },
                { translateY: animY },
                { scale: animScale },
              ],
            },
          ]}
        >
          <KanjiCard {...deck[currentCardIndex]} />
        </Animated.View>
      )}
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f5',
  },
  divider: {
    position: 'absolute',
    top: height / 2,
    width: '100%',
    height: 1,
    backgroundColor: '#999',
  },
  deckContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  deckShadow: {
    position: 'absolute',
    backgroundColor: '#444',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  deckFace: {
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardWrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    zIndex: 20,
  },
});
