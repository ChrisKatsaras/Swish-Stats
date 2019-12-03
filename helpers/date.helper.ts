export function getCurrentSeasonYear() {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // If the month is not November or December, we are in the new year and should display the
    // "old" season data. e.g January 2020 should still be search for 2019 data while November 2020
    // should be searching for 2020 data as a new season has begun
    if (currentMonth !== 10 && currentMonth !== 11) {
        currentYear -= 1;
    }

    return currentYear;
}
