import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useGameStore } from '../src/store/gameStore';
import { THEMES, getThemeColors } from '../src/utils/themes';

export default function ShopScreen() {
  const router = useRouter();
  const gems = useGameStore((state) => state.gems);
  const currentTheme = useGameStore((state) => state.currentTheme);
  const unlockedThemes = useGameStore((state) => state.unlockedThemes);
  const purchaseTheme = useGameStore((state) => state.purchaseTheme);
  const setTheme = useGameStore((state) => state.setTheme);

  const colors = getThemeColors(currentTheme);
  const themeList = Object.values(THEMES);

  const handleThemePress = (themeId: keyof typeof THEMES, price: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      setTheme(themeId);
      return;
    }

    purchaseTheme(themeId, price);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.accent }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Shop</Text>
      </View>

      <View style={styles.gemsBar}>
        <Text style={[styles.gemsText, { color: colors.accent }]}>
          💎 {gems}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {themeList.map((theme) => {
          const isUnlocked = unlockedThemes.includes(theme.id);
          const isCurrent = currentTheme === theme.id;
          const canAfford = gems >= theme.price;

          let buttonLabel = '';
          if (theme.price === 0) {
            buttonLabel = isCurrent ? 'Equipped' : 'Equip';
          } else if (isUnlocked) {
            buttonLabel = isCurrent ? 'Equipped' : 'Equip';
          } else {
            buttonLabel = canAfford
              ? `Unlock for ${theme.price}💎`
              : `Need ${theme.price}💎`;
          }

          const isDisabled = !isUnlocked && !canAfford && theme.price > 0;

          return (
            <View
              key={theme.id}
              style={[
                styles.themeCard,
                { backgroundColor: colors.card, borderColor: isCurrent ? colors.accent : 'transparent' }
              ]}
            >
              <View style={styles.themeHeader}>
                <Text style={[styles.themeName, { color: colors.text }]}>
                  {theme.name}
                </Text>
                {theme.price > 0 && (
                  <Text style={[styles.themePrice, { color: colors.mutedText }]}>
                    {theme.price}💎
                  </Text>
                )}
              </View>
              <Text style={[styles.themeDescription, { color: colors.mutedText }]}>
                {theme.description}
              </Text>

              <View style={styles.swatchRow}>
                <View style={[styles.swatch, { backgroundColor: theme.colors.background }]} />
                <View style={[styles.swatch, { backgroundColor: theme.colors.accent }]} />
                <View style={[styles.swatch, { backgroundColor: theme.colors.accentSecondary }]} />
              </View>

              <TouchableOpacity
                disabled={isDisabled}
                onPress={() => handleThemePress(theme.id, theme.price, isUnlocked)}
                style={[
                  styles.button,
                  {
                    backgroundColor: isCurrent
                      ? colors.accentSecondary
                      : isUnlocked
                      ? colors.accent
                      : canAfford
                      ? colors.accent
                      : 'rgba(148, 163, 184, 0.4)'
                  }
                ]}
              >
                <Text style={styles.buttonText}>{buttonLabel}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  backButton: {
    padding: 8
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  gemsBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end'
  },
  gemsText: {
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    padding: 20,
    gap: 16
  },
  themeCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600'
  },
  themePrice: {
    fontSize: 14,
    fontWeight: '500'
  },
  themeDescription: {
    fontSize: 14,
    marginBottom: 12
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12
  },
  swatch: {
    width: 32,
    height: 24,
    borderRadius: 6
  },
  button: {
    marginTop: 4,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  }
});
