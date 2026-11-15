"use strict";

const COOKIE_CONSENT_NAME = "pokemon_cookie_consent";
const COOKIE_THEME_NAME = "pokemon_theme";
const COOKIE_LIFETIME_DAYS = 365;

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    document.cookie = [
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        `expires=${expires}`,
        "path=/",
        "SameSite=Lax"
    ].join("; ");
}

function getCookie(name) {
    const encodedName = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split("; ");

    const foundCookie = cookies.find((cookie) => cookie.startsWith(encodedName));

    if (!foundCookie) {
        return null;
    }

    const value = foundCookie
        .split("=")
        .slice(1)
        .join("=");

    return decodeURIComponent(value);
}

function deleteCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=/; SameSite=Lax`;
}

function saveCookieChoice(choice) {
    setCookie(COOKIE_CONSENT_NAME, choice, COOKIE_LIFETIME_DAYS);

    const banner = document.getElementById("cookieBanner");

    if (banner) {
        banner.classList.add("hidden");
    }
}

function initializeCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    const acceptButton = document.getElementById("cookieAccept");
    const declineButton = document.getElementById("cookieDecline");

    if (!banner || !acceptButton || !declineButton) {
        return;
    }

    const savedChoice = getCookie(COOKIE_CONSENT_NAME);

    if (savedChoice) {
        banner.classList.add("hidden");
    }

    acceptButton.addEventListener("click", () => {
        saveCookieChoice("accepted");
    });

    declineButton.addEventListener("click", () => {
        deleteCookie(COOKIE_THEME_NAME);
        saveCookieChoice("declined");
    });
}

document.addEventListener("DOMContentLoaded", initializeCookieBanner); 