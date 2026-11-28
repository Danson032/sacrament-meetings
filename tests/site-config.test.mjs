import assert from 'node:assert/strict';
import test from 'node:test';
import { getPublicSiteUrl } from '../lib/site-config.ts';

function withSiteUrl(value, callback) {
  const previous = process.env.SITE_URL;

  if (value === undefined) {
    delete process.env.SITE_URL;
  } else {
    process.env.SITE_URL = value;
  }

  try {
    callback();
  } finally {
    if (previous === undefined) {
      delete process.env.SITE_URL;
    } else {
      process.env.SITE_URL = previous;
    }
  }
}

test('allows an unset public site URL', () => {
  withSiteUrl(undefined, () => {
    assert.equal(getPublicSiteUrl(), undefined);
  });
});

test('accepts a public HTTP or HTTPS origin', () => {
  withSiteUrl('https://ward.example.org', () => {
    assert.equal(getPublicSiteUrl().href, 'https://ward.example.org/');
  });
});

test('rejects invalid URLs and values that are not site origins', () => {
  for (const value of [
    'not-a-url',
    'ftp://ward.example.org',
    'https://ward.example.org/path',
    'https://user:password@ward.example.org',
  ]) {
    withSiteUrl(value, () => {
      assert.throws(getPublicSiteUrl, /SITE_URL/);
    });
  }
});
