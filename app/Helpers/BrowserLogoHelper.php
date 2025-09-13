<?php

namespace App\Helpers;

class BrowserLogoHelper
{
    /**
     * Detect browser and return browser-logos CDN URL
     *
     * @param string $userAgent
     * @return string|null
     */
    public static function getBrowserIcon(string $userAgent): ?string
    {
        $browser = 'other';

        if (stripos($userAgent, 'Chrome') !== false && stripos($userAgent, 'Edg') === false) {
            $browser = 'chrome';
        } elseif (stripos($userAgent, 'Firefox') !== false) {
            $browser = 'firefox';
        } elseif (stripos($userAgent, 'Safari') !== false && stripos($userAgent, 'Chrome') === false) {
            $browser = 'safari';
        } elseif (stripos($userAgent, 'Edg') !== false || stripos($userAgent, 'Edge') !== false) {
            $browser = 'edge';
        } elseif (stripos($userAgent, 'OPR') !== false || stripos($userAgent, 'Opera') !== false) {
            $browser = 'opera';
        } elseif (stripos($userAgent, 'MSIE') !== false || stripos($userAgent, 'Trident') !== false) {
            $browser = 'ie';
        }

        // CDN base from cdnjs
        $cdnBase = 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/';

        $map = [
            'chrome' => 'chrome/chrome_48x48.png',
            'firefox' => 'firefox/firefox_48x48.png',
            'safari' => 'safari/safari_48x48.png',
            'edge' => 'edge/edge_48x48.png',
            'opera' => 'opera/opera_48x48.png',
            'ie' => 'edge-beta/edge-beta_48x48.png',
            'other' => 'v8/v8_48x48.png', // custom fallback
        ];

        return $cdnBase . ($map[$browser] ?? $map['other']);
    }

    public static function parseBrowser(string $userAgent): array
    {
        $browser = 'other';
        $name = 'Other';
        $version = null;

        if (preg_match('/Edg\/([\d\.]+)/i', $userAgent, $matches)) {
            $browser = 'edge';
            $name = 'Microsoft Edge';
            $version = $matches[1];
        } elseif (preg_match('/OPR\/([\d\.]+)/i', $userAgent, $matches)) {
            $browser = 'opera';
            $name = 'Opera';
            $version = $matches[1];
        } elseif (preg_match('/Chrome\/([\d\.]+)/i', $userAgent, $matches) && stripos($userAgent, 'Edg') === false) {
            $browser = 'chrome';
            $name = 'Google Chrome';
            $version = $matches[1];
        } elseif (preg_match('/Firefox\/([\d\.]+)/i', $userAgent, $matches)) {
            $browser = 'firefox';
            $name = 'Mozilla Firefox';
            $version = $matches[1];
        } elseif (preg_match('/Version\/([\d\.]+).*Safari/i', $userAgent, $matches)) {
            $browser = 'safari';
            $name = 'Safari';
            $version = $matches[1];
        } elseif (preg_match('/MSIE\s([\d\.]+)/i', $userAgent, $matches)) {
            $browser = 'ie';
            $name = 'Internet Explorer';
            $version = $matches[1];
        } elseif (preg_match('/Trident\/.*rv:([\d\.]+)/i', $userAgent, $matches)) {
            $browser = 'ie';
            $name = 'Internet Explorer';
            $version = $matches[1];
        }

        return [
            'browser' => $browser,   // normalized key (for icon map)
            'name' => $name,      // human readable
            'version' => $version,   // string|null
        ];
    }
}
