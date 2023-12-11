const constants = {
  // gender
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHERS: "OTHERS",

  // Account Type
  NORMAL: "NORMAL",
  TOURNAMENT: "TOURNAMENT",
  TEAM: "TEAM",
  BRAND: "BRAND",
  STUDIO: "STUDIO",

  // regex pattern
  EMAILPATTERN: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  PASSWORDPATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,

  // Status
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIEVE: "ARCHIEVE",

  // Social Login
  FACEBOOK: "FACEBOOK",
  GOOGLE: "GOOGLE",

  // Otp Medium
  SMS: "SMS",
  MAIL: "MAIL",

  // Gamepedia
  GAMEFOLIO: "Gamefolio",
  GAMEFOLIODESCRIPTION:
    "Gamefolio is a go-to online resource for gamers, offering game information, guides, teams, and a vibrant community for discussing all things gaming.",
  GAMEPEDIA: "Gamepedia",
  PLOT: "Plot",
  AWARDS: "Awards",
  RATINGANDREVIEW: "Rating & Review",
  GALLERY: "Gallery",
  CREATORS: "Creators",

  // settings
  PROFILETYPE: "Profile Type",
  ACCOUNTSETTINGS: "Account Settings",
  SECURITY: "Security",
  CONNECTIONS: "Connections",
  NOTIFICATIONS: "Notifications",
  HELP: "Help",

  // post
  POSTS: "Posts",
  ARTICLES: "Articles",
  BLOGS: "Blogs",

  // Themes
  GENERAL: "General",
  FOLLOWREQUEST: "Follow Request",
  GAMESOREIENTED: "Games Oriented",
  THEMES: "Themes",
  THEMESDESCRPITION:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",

  // Draft
  DRAFT: "Drafts",
  DRAFTDESCRIPTION:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
};

export default constants;
