import api from './api.js';

const defaultThumbnail =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

const DEFAULT_PLAYLIST_ID = 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w';
const DEFAULT_PLAYLIST_URL = `https://www.youtube.com/embed/videoseries?list=${DEFAULT_PLAYLIST_ID}`;

const defaultPlaylist = [
  {
    title: 'Playlist: Introduction & Roadmap',
    duration: '11:20',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
  {
    title: 'Playlist: Core Concepts',
    duration: '22:05',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
  {
    title: 'Playlist: Practice Session',
    duration: '18:45',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
  {
    title: 'Playlist: Advanced Build',
    duration: '26:10',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
  {
    title: 'Playlist: Project Walkthrough',
    duration: '20:50',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
  {
    title: 'Playlist: Wrap-up & Next Steps',
    duration: '14:05',
    embedUrl: DEFAULT_PLAYLIST_URL,
  },
];

const getPlaylistId = (youtubeLink) => {
  if (!youtubeLink) {
    return DEFAULT_PLAYLIST_ID;
  }
  const listMatch = youtubeLink.match(/list=([^&]+)/);
  return listMatch ? listMatch[1] : DEFAULT_PLAYLIST_ID;
};

const buildPlaylist = (youtubeLink) => {
  const playlistId = getPlaylistId(youtubeLink);
  return defaultPlaylist.map((item, index) => ({
    ...item,
    title: item.title.replace('Playlist:', `Lesson ${index + 1}:`),
    embedUrl: `https://www.youtube.com/embed?listType=playlist&list=${playlistId}&index=${index}`,
  }));
};

const fallbackCourses = [
  {
    _id: 'web-1',
    title: 'Modern HTML & CSS Essentials',
    description: 'Build responsive layouts with Flexbox, Grid, and modern styling best practices (playlist).',
    category: 'Web Development',
    price: 0,
  youtubeLink: `https://www.youtube.com/playlist?list=${DEFAULT_PLAYLIST_ID}`,
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    playlistVideos: defaultPlaylist,
  },
  {
    _id: 'web-2',
    title: 'JavaScript for UI Builders',
    description: 'Learn ES6+, DOM patterns, and UI logic that powers modern web apps.',
    category: 'JavaScript',
    price: 19,
  youtubeLink: `https://www.youtube.com/playlist?list=${DEFAULT_PLAYLIST_ID}`,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    playlistVideos: defaultPlaylist,
  },
  {
    _id: 'web-3',
    title: 'React Essentials for Beginners',
    description: 'Master components, hooks, and routing with a hands-on React project.',
    category: 'React',
    price: 29,
  youtubeLink: `https://www.youtube.com/playlist?list=${DEFAULT_PLAYLIST_ID}`,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    playlistVideos: defaultPlaylist,
  },
  {
    _id: 'web-4',
    title: 'Full-Stack MERN Launchpad',
    description: 'Connect a Node/Express API with React and MongoDB to ship full-stack apps.',
    category: 'MERN Stack',
    price: 49,
  youtubeLink: `https://www.youtube.com/playlist?list=${DEFAULT_PLAYLIST_ID}`,
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    playlistVideos: defaultPlaylist,
  },
];

const withFallback = (courses) => {
  const source = courses && courses.length ? courses : fallbackCourses;
  return source.map((course) => ({
    ...course,
    thumbnail: course.thumbnail || defaultThumbnail,
    playlistVideos: course.playlistVideos || buildPlaylist(course.youtubeLink),
  }));
};

export const getCourses = async () => {
  try {
    const { data } = await api.get('/courses');
    return withFallback(data);
  } catch (error) {
    return fallbackCourses;
  }
};

export const getCourseById = async (id) => {
  try {
    const { data } = await api.get(`/courses/${id}`);
    return {
      ...data,
      thumbnail: data.thumbnail || defaultThumbnail,
      playlistVideos: data.playlistVideos || buildPlaylist(data.youtubeLink),
    };
  } catch (error) {
    const courses = await getCourses();
    return courses.find((course) => course._id === id);
  }
};

export const createCourse = async (payload) => {
  const { data } = await api.post('/courses', payload);
  return data;
};

export const updateCourse = async (id, payload) => {
  const { data } = await api.put(`/courses/${id}`, payload);
  return data;
};

export const deleteCourse = async (id) => {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
};
