import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

type ToastAction = { label: string; onPress: () => void };
type ToastContextValue = {
  show: (message: string, durationMs?: number, action?: ToastAction) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [action, setAction] = useState<ToastAction | undefined>(undefined);
  const opacity = useRef(new Animated.Value(0)).current;

  const hide = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setMessage(null);
      setAction(undefined);
    });
  }, [opacity]);

  const show = useCallback(
    (msg: string, durationMs = 1400, act?: ToastAction) => {
      setMessage(msg);
      setAction(act);
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.delay(durationMs),
      ]).start(hide);
    },
    [opacity, hide],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message ? (
        <View pointerEvents="box-none" style={styles.wrapper}>
          <Animated.View style={[styles.toast, { opacity }]}>
            <Text style={styles.text}>{message}</Text>
            {action ? (
              <Text
                style={styles.action}
                onPress={() => {
                  hide();
                  action.onPress();
                }}
              >
                {action.label}
              </Text>
            ) : null}
          </Animated.View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    maxWidth: '90%',
  },
  text: { color: '#fff', fontWeight: '700' },
  action: {
    color: '#93c5fd',
    fontWeight: '700',
    marginTop: 6,
  },
});
