import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("http://localhost:23456/");

  const heading = await page.getByRole('heading', { name: 'Annonces récentes', exact: true });
  const ad = await page.getByRole('link', { name: 'Veste en cuir homme Veste en' })
  expect(heading).toBeVisible
  expect(ad).toBeVisible

  
  await ad.click()

  const adHeading = await page.getByRole('heading', { name: 'Veste en cuir homme' })
  const adImg = await page.getByRole('img')
  const adPrice = await page.getByText('120 €')
  const adDeleteBtn = await page.getByRole('button', { name: 'Supprimer l\'annonce' })
  const adEditBtn = await page.getByRole('button', { name: 'Modifier l\'annonce' })
  const adCategory = await page.getByText('Catégorie: vêtements')

  expect(adHeading && adImg && adPrice && adDeleteBtn && adEditBtn && adCategory).toBeVisible
  
  const newAdBtn = await page.getByRole('link', { name: 'Publier une annonce' })
  newAdBtn.click()

  const vintageCheck = await page.getByRole('checkbox', { name: 'vintage' })
  vintageCheck.check()
  await page.getByRole('button', { name: 'Submit' }).click();
  
  const newAd = await page.getByText('Je vends ma 2064000 €Ma 206');
  expect(newAd).toBeVisible

  await page.pause()
  



});


