import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = () =>
    rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: "https://mind-matrix.github.io",
        items: import.meta.glob('./**/*.md'),
    });