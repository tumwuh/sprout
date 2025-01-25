import {usePreferredDark, useWindowSize} from "@vueuse/core";
export default function useBracketMatch(){
    const isDark = usePreferredDark()

    const {width} = useWindowSize()

    const bracketStyle = {
        width: '100%',
        height: '500px',
        connectionLinesWidth: 2,
        connectionLinesColor: "#5b5b5b",
        navButtonArrowSize: 25,
        scrollButtonArrowSize: 24,
        distanceBetweenScorePairs: 8,
        highlightedConnectionLinesColor: isDark ? "#7d7d7d" : "#2e2e2e",
        highlightedPlayerTitleColor: isDark ? "#7d7d7d" : "#2e2e2e",
        mainVerticalPadding: 40,
        matchAxisMargin: 8,
        matchTextColor: isDark ? "#7d7d7d" : "#2e2e2e",
        matchFontSize: 18,
        matchMinVerticalGap: 30,
        matchHorMargin: 10,
        matchStatusBgColor: isDark ? "#7d7d7d" : "#2e2e2e",
        navButtonSvgColor: isDark ? "#7d7d7d" : "#2e2e2e",
        playerTitleFontFamily: "courier",
        rootBgColor: "transparent",
        rootBorderColor: isDark ? "#7d7d7d" : "#2e2e2e",
        roundTitlesVerticalPadding: 0,
        roundTitleColor: isDark ? "#7d7d7d" : "#2e2e2e",
        roundTitlesFontFamily: "sans",
        roundTitlesFontSize: 18,
        scoreFontFamily: "serif",
        scrollbarWidth: 8,
        scrollbarColor: isDark ? "#7d7d7d" : "#2e2e2e",
        getNationalityHTML: (player: any) => {
            return `<img style="width: 40px; height: 40px; border-radius: 100%;" class="bg-white" src="${player.nationality}" alt="${player.title}">`
        },
        getPlayerTitleHTML: (player: any) => {
            return `<span title="${player.title}" class="ellipsis inline-block" style="font-size: 18px; font-family: sans-serif; color: ${isDark ? "#7d7d7d" : "#2e2e2e"}; width: 120px;">${player.title}</span>`
        }
    }

   return {bracketStyle}
}