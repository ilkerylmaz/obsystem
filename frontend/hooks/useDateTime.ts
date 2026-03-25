'use client';

import { useState, useEffect } from 'react';

export const useDateTime = () => {
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Metot gibi kullanabileceğin yardımcı fonksiyonlar
    const getFormattedTime = () => {
        return now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const getFormattedDate = () => {
        return now.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const getDayName = () => {
        return now.toLocaleDateString('tr-TR', { weekday: 'long' });
    };

    return {
        rawDate: now,
        time: getFormattedTime(),
        date: getFormattedDate(),
        day: getDayName(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    };
};