import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { challengeList } from "src/dummyData";
import { MypageHistoryType } from "src/types";
import { ChallengeInfo } from "../challenge";
import WrapperTitle from "./WrapperTitle";

interface Props {
  histories: Array<MypageHistoryType>;
}

export default function HabitsHistory({ histories }: Props) {
  const router = useRouter();
  const { tab } = router.query;
  
  return (
    <>
      {tab !== 'history' && (
        <WrapperTitle
          content="Habits History"
          target="history"
          marginTop="48px"
        />
      )}
      <Box mt="4px" px="6px">
        {histories.map(history => {
          const challenge = challengeList.find(item => item.id === history.challengeId);
          return (
            <ChallengeInfo
              key={history.challengeId}
              {...challenge}
              deposit={history.balance}
              depositsVisible
              mt="20px"
            />
          )
        })}
      </Box>
    </>
  );
};