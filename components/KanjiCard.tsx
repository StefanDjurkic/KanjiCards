// src/components/KanjiCard.tsx

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface KanjiCardProps {
  kanjiImage: ImageSourcePropType;
  hiraganaImage: ImageSourcePropType;
  romajiText: string;
}

const KanjiCard: React.FC<KanjiCardProps> = ({
  kanjiImage,
  hiraganaImage,
  romajiText,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => setFlipped(f => !f)}
    >
      {!flipped ? (
        <Image source={kanjiImage} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.backContainer}>
          <Image
            source={hiraganaImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.romaji}>{romajiText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default KanjiCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 400,
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backContainer: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '70%',
  },
  romaji: {
    marginTop: 16,
    fontSize: 20,
    color: '#333',
  },
});
