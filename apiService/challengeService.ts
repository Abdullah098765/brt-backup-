import { showToastError, showToastInfo } from "../notification";
import api from "./globalFetchAPI";
export class ChallengeService {
    static async create(body) {
        return await api.post("/challenges", body);
    }
    static async findAll() {
        try {
            const response = await api.get("/challenges");
            return response.data;
        } catch (error) {
            return error;
        }
    }
    static async challengeRequest(challengeId) {
        try {
            const response = await api.post("/challenges/request", { challengeId });
            return response.data;
        } catch (error) {
            showToastInfo(error.response.data.message);
            return error;
        }
    }

    static async likeOrUnLikeChallenge(challengeId) {
        try {
            const response = await api.post("/challenges/like-unlike", { challengeId });
            return response.data;
        } catch (error) {
            showToastInfo(error.response.data.message);
            return error;
        }
    }
    static async bookmarkChallenge(challengeId) {
        try {
            const response = await api.post("/challenges/bookmark", { challengeId });
            return response.data;
        } catch (error) {
            showToastInfo(error.response.data.message);
            return error;
        }
    }

    static async acceptChallenge(body) {
        try {
            console.log({ body });
            const response = await api.post("/challenges/accept", body);
            return response.data;
        } catch (error) {
            showToastInfo(error.response.data.message);
            return error;
        }
    }
    static async rejectChallenge(body) {
        try {
            console.log({ body });
            const response = await api.post("/challenges/accept", { challengeId: body });
            return response.data;
        } catch (error) {
            showToastInfo(error.response.data.message);
            return error;
        }
    }
    static async voteParticipant(body) {
        // try {
        return await api.post("/challenges/participant/vote", { participantId: body });
        // return response.data;
        // } catch (error) {
        //     showToastInfo(error.response.data.message);
        //     return error;
        // }
    }
}
