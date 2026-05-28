export const SITE = {
  website: "https://rtweera.page/",
  author: "Ravindu Tharuka Weerasinghe",
  profile: "https://rtweera.page/",
  desc: "Portfolio of Ravindu Tharuka Weerasinghe — AI Engineer and undergraduate at University of Moratuwa, specializing in small language models, MLOps, and real-world AI systems.",
  title: "Ravindu Tharuka Weerasinghe",
  displayTitle: "Ravindu Weerasinghe",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/rtweera/my-portfolio/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Colombo", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
