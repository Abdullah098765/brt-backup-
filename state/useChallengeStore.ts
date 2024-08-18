import { create } from "zustand";
import { ChallengeService } from "../apiService/challengeService";
import { IChallenge } from "./interfaces";
import { showToastInfo } from "../notification";

interface IProps {
    challenges: IChallenge[];
    createChallenge: (body: FormData) => void;
    findAllChallenges: () => void;
    requestChallengeInvite: (challengeId: string) => void;
    likeAndUnlike: (challengeId: string) => void;
    bookmark: (challengeId: string) => void;
    acceptChallenge: (val: FormData) => void;
    rejectChallenge: (val: string) => void;
    vote: (challenge: IChallenge) => Promise<void>;
    acceptLoading: boolean;
    isPurchase: boolean;
    setIsPurchase: (isPurchase: boolean) => void;
}

export const useChallengeStore = create<IProps>((set, get) => ({
    challenges: [],
    acceptLoading: false,
    isPurchase: false,
    setIsPurchase(isPurchase) {
        set({ isPurchase });
    },
    vote: async (challenge) => {
        try {
            const { challenges } = get();
            let index = challenges.findIndex((i) => i._id === challenge._id);
            challenges[index].participants[0].voteCount = challenges[index].participants[0].voteCount + 1;
            challenges[index].participants[0].isVoted = true;
            await ChallengeService.voteParticipant(challenge.participants[0]._id);
            set({ challenges });
        } catch (error) {
            if (error?.response?.data?.message == "You don't have enough votes") {
                set({ isPurchase: true });
            } else {
                showToastInfo(error.response.data.message);
            }
            console.log("vote", { error });
        }
    },
    createChallenge: async (body) => {
        try {
            const { challenges } = get();
            const response: any = await ChallengeService.create(body);
            set({ challenges: [...challenges, response] });
        } catch (error) {
            console.log({ error });
        }
    },
    findAllChallenges: async () => {
        try {
            const response = await ChallengeService.findAll();
            set({ challenges: response });
        } catch (error) {
            console.log({ error });
        }
    },
    requestChallengeInvite: async (challengeId) => {
        await ChallengeService.challengeRequest(challengeId);
    },
    likeAndUnlike: async (challengeId) => {
        const { challenges } = get();
        let items = [...challenges];
        let idx = challenges.findIndex((i) => i._id === challengeId);
        items[idx].like = !items[idx].like;
        items[idx].likeCount = items[idx].like ? items[idx].likeCount + 1 : items[idx].likeCount - 1;
        set({ challenges: items });
        await ChallengeService.likeOrUnLikeChallenge(challengeId);
    },
    bookmark: async (challengeId) => {
        const { challenges } = get();
        let items = [...challenges];
        let idx = challenges.findIndex((i) => i._id === challengeId);
        items[idx].bookmark = !items[idx].bookmark;
        items[idx].bookmarkCount = items[idx].bookmark ? items[idx].bookmarkCount + 1 : items[idx].bookmarkCount - 1;
        set({ challenges: items });
        await ChallengeService.bookmarkChallenge(challengeId);
    },

    acceptChallenge: async (body) => {
        set({ acceptLoading: true });
        await ChallengeService.acceptChallenge(body);
        set({ acceptLoading: true });
    },
    rejectChallenge: async (body) => {
        set({ acceptLoading: true });
        await ChallengeService.acceptChallenge(body);
        set({ acceptLoading: true });
    },
}));
