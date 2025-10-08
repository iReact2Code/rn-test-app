import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native';

type Props = {
  uri: string | undefined;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  fallbackLabel?: string;
};

export default function NetworkImage({
  uri,
  style,
  containerStyle,
  fallbackLabel,
}: Props) {
  const [errored, setErrored] = React.useState(false);

  if (!uri || errored) {
    return (
      <View style={[styles.fallback, containerStyle, style as any]}>
        <Text style={styles.fallbackText}>
          {fallbackLabel || 'Image unavailable'}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setErrored(true)}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#e6e8eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#57606a',
    fontSize: 12,
  },
});
