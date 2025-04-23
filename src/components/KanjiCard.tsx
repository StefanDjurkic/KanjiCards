import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

// Props define one card's visuals: front image (kanji), optional back image (hiragana), and fallback text.
interface Props {
  kanjiImage:    ImageSourcePropType;
  hiraganaImage: ImageSourcePropType | null;
  romajiText:    string;
}

export default function KanjiCard({ kanjiImage, hiraganaImage, romajiText }: Props) {
  const [flipped, setFlipped] = useState(false);
  const showHiraganaImage = hiraganaImage !== null;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => setFlipped(prev => !prev)} // Flip card on tap
    >
      {!flipped ? (
        <Image source={kanjiImage} style={styles.image} resizeMode="contain" />
      ) : showHiraganaImage ? (
        <Image source={hiraganaImage!} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.romaji}>{romajiText}</Text> // Fallback if no image for back
      )}
    </TouchableOpacity>
  );
}

// Styles for the flashcard
const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '70%',
  },
  romaji: {
    fontSize: 28,
    color: '#333',
  },
});
