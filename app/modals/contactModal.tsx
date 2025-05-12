import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ContactButton from "@/components/ContactButton";

const contactModal = () => {
  const handleTelegramPress = () => {
    Linking.openURL("https://t.me/+F7ScqwF4BocyZDBi");
  };
  const handleGithubPress = () => {
    Linking.openURL("https://github.com/Sheltiq/fiscope-mobile-app");
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={"Связаться"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._20 }}
        />
        <View>
          <ContactButton
            title="Телеграмм"
            icon="telegram"
            onPress={handleTelegramPress}
          />
          <ContactButton
            title="Исходный код"
            icon="github"
            onPress={handleGithubPress}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};

export default contactModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
});
