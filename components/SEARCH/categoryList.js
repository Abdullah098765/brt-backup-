import {
  searchUsersOpenSearch,
  listAIChallenges,
  listVideoChallengesBasic,
  searchGroupsBasic,
  searchEventsBasic,
  searchChannelBasic,
  searchUserFriends,
} from "../../src/graphql/customqueries";
import { MdGroups2 } from "react-icons/md";
import { BiUserPin, BiCalendarEvent, BiSolidGroup } from "react-icons/bi";
import {
  GiJeweledChalice,
  GiArtificialIntelligence,
  GiVideoConference,
} from "react-icons/gi";
import { format } from "date-fns";

export const categoryList = [
  {
    title: "Recent",
    icon: ({ className, color }) => (
      <BiSolidGroup color={color} className={className} />
    ),
    redirectUrl: (url) => url,
  },
  {
    title: "Friends",
    field: "searchFriends",
    query: searchUserFriends,
    filter: (value) => {
      return {
        or: [
          { user1ID: { matchPhrasePrefix: value } },
          { user2ID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <BiSolidGroup color={color} className={className} />
    ),
    redirectUrl: (id) => `/profile/${id}`,
  },
  {
    title: "Users",
    field: "searchUsers",
    query: searchUsersOpenSearch,
    filter: (value) => {
      return {
        not: { privateProfile: { eq: true } },
        or: [
          { username: { matchPhrasePrefix: value } },
          { firstName: { matchPhrasePrefix: value } },
          { lastName: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <BiUserPin color={color} className={className} />
    ),
    redirectUrl: (id) => `/profile/${id}`,
  },
  {
    title: "Video Challenges",
    field: "searchVideoChallenges",
    query: listVideoChallengesBasic,
    filter: (value) => {
      return {
        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
          { userID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiJeweledChalice color={color} className={className} />
    ),
    redirectUrl: (id) => `/collection/challenges/${id}`,
  },
  {
    title: "AI Challenges",
    field: "searchAIChallenges",
    query: listAIChallenges,
    filter: (value) => {
      return {
        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiArtificialIntelligence color={color} className={className} />
    ),
    redirectUrl: (id) => `/`,
  },
  {
    title: "Channels",
    field: "searchGroupChannels",
    query: searchChannelBasic,
    filter: (value) => {
      return {
        or: [
          { channelName: { matchPhrasePrefix: value } },
          { channelDescription: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiVideoConference color={color} className={className} />
    ),
    redirectUrl: (id) => `/channels/${id}`,
  },
  {
    title: "Groups",
    field: "searchGroups",
    query: searchGroupsBasic,
    filter: (value) => {
      return {
        or: [
          { groupName: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <MdGroups2 color={color} className={className} />
    ),
    redirectUrl: (id) => `/groups/${id}`,
  },
  {
    title: "Events",
    field: "searchEvents",
    query: searchEventsBasic,
    filter: (value, startDate, endDate, dateSelected) => {
      let tempFIlter = {};

      if (value) {
        tempFIlter.or = [
          { eventName: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
        ];
      }

      if (startDate && endDate && dateSelected) {
        tempFIlter.startDate = {
          gte: format(new Date(startDate), "yyyy-MM-dd"),
        };
        tempFIlter.endDate = { lte: format(new Date(endDate), "yyyy-MM-dd") };
      }

      return tempFIlter;
    },
    icon: ({ className, color }) => (
      <BiCalendarEvent color={color} className={className} />
    ),
    redirectUrl: (id) => `/events/${id}`,
  },
];

export const categoryVideoChallengesList = [
  {
    title: "All",
    status: "all",
    field: "searchVideoChallenges",
    query: listVideoChallengesBasic,
    filter: (value) => {
      return {
        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
          { userID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiJeweledChalice color={color} className={className} />
    ),
    redirectUrl: (id) => `/collection/challenges/${id}`,
  },
  {
    title: "Not Started",
    status: "Not_Started",
    field: "searchVideoChallenges",
    query: listVideoChallengesBasic,
    filter: (value) => {
      return {
        status: { eq: "Not_Started" },
        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
          { userID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiJeweledChalice color={color} className={className} />
    ),
    redirectUrl: (id) => `/collection/challenges/${id}`,
  },
  {
    title: "Started",
    status: "Started",
    field: "searchVideoChallenges",
    query: listVideoChallengesBasic,
    filter: (value) => {
      return {
        status: { eq: "Started" },
        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
          { userID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiJeweledChalice color={color} className={className} />
    ),
    redirectUrl: (id) => `/collection/challenges/${id}`,
  },
  {
    title: "Collection",
    status: "Archived",
    field: "searchVideoChallenges",
    query: listVideoChallengesBasic,
    filter: (value) => {
      return {
        status: { eq: "Archived" },

        or: [
          { title: { matchPhrasePrefix: value } },
          { description: { matchPhrasePrefix: value } },
          { userID: { matchPhrasePrefix: value } },
        ],
      };
    },
    icon: ({ className, color }) => (
      <GiJeweledChalice color={color} className={className} />
    ),
    redirectUrl: (id) => `/collection/challenges/${id}`,
  },
];
