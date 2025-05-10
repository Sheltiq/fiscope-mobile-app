import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import HomeCard from "@/components/HomeCard";
import TransactionList from "@/components/TransactionList";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import useFetchData from "@/hooks/useFetchData";
import { TransactionType } from "@/types";
import { ThemeContext } from "@/contexts/themeContext";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const router = useRouter();

  const constraints = [
    where("uid", "==", user?.uid),
    orderBy("date", "desc"),
    limit(30),
  ];

  const {
    data: recentTransactions,
    error,
    loading: transactionsLoading,
  } = useFetchData<TransactionType>("transactions", constraints);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={16} color={colors.neutral400}>
              Привет,
            </Typo>
            <Typo size={20} fontWeight={"medium"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/modals/searchModal")}
            style={[
              styles.searchIcon,
              {
                backgroundColor:
                  currentTheme === "dark" ? colors.neutral700 : colors.btnLight,
              },
            ]}
          >
            <FontAwesome6
              name="magnifying-glass"
              size={verticalScale(22)}
              color={
                currentTheme === "dark" ? colors.neutral200 : colors.neutral350
              }
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <HomeCard />
          </View>

          <TransactionList
            data={recentTransactions}
            loading={transactionsLoading}
            emptyListMessage="Транзакции еще не добавлены"
            title="Недавние транзакции"
          />
        </ScrollView>

        <Button
          style={styles.floatingButton}
          onPress={() => router.push("/modals/transactionModal")}
        >
          <FontAwesome6
            name="plus"
            size={verticalScale(20)}
            color={colors.white}
          />
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    // backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
    borderColor: colors.neutral500,
    borderWidth: 0.3,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },

  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
