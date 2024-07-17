import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
        return `${daysAgo} days ago`;
    }

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
        return `${weeksAgo} weeks ago`;
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
        return `${monthsAgo} months ago`;
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo} years ago`;
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}