interface Activity {
    action: string;
    user: string;
    time: string;
    timestamp: number;
    type: 'recipe' | 'favorite' | 'like' | 'meal-plan' | 'shopping';
}

const getActivityKey = () => {
    const username = localStorage.getItem('username');
    return username ? `recentActivities_${username}` : 'recentActivities_guest';
};

const MAX_ACTIVITIES = 10;

export const addActivity = (action: string, type: Activity['type']) => {
    try {
        const key = getActivityKey();
        const activities: Activity[] = JSON.parse(localStorage.getItem(key) || '[]');

        const newActivity: Activity = {
            action,
            user: 'You',
            time: 'Just now',
            timestamp: Date.now(),
            type
        };

        // Add new activity at the beginning
        activities.unshift(newActivity);

        // Keep only the latest MAX_ACTIVITIES
        const trimmedActivities = activities.slice(0, MAX_ACTIVITIES);

        localStorage.setItem(key, JSON.stringify(trimmedActivities));
    } catch (error) {
        console.error('Error adding activity:', error);
    }
};

export const getRecentActivities = (): Activity[] => {
    try {
        const key = getActivityKey();
        const activities: Activity[] = JSON.parse(localStorage.getItem(key) || '[]');

        // Update relative time for each activity
        return activities.map(activity => ({
            ...activity,
            time: getRelativeTime(activity.timestamp)
        }));
    } catch (error) {
        console.error('Error getting activities:', error);
        return [];
    }
};

const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
};

export const clearActivities = () => {
    const key = getActivityKey();
    localStorage.removeItem(key);
};
