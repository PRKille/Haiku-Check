import { Haiku } from './../src/haiku.js';

describe('Haiku', () => {
  let poem;
  beforeEach(() => {
    poem = new Haiku();
    //When poem was tabbed in correctly it created spacing issues in arrays
    poem.addPoem(`this does not
have enough
syllables`);
    poem.lineCount();
  });

  test('should check to see if poem has three lines', () => {
    expect(poem.lines.length).toBe(3);
  });

  test('should determine that poems containing more or less than 3 lines are not haikus', () => {
    let notHaiku = new Haiku();
    notHaiku.addPoem(`this poem
    has four lines
    and is not a
    haiku`);
    expect(notHaiku.lineCount()).toBe(false);
  });

  test('should return an array containing the words of a line of the poem', () => {
    poem.wordSplit();
    expect(poem.lineOne).toEqual([`this`,`does`,`not`]);
    expect(poem.lineTwo).toEqual(['have','enough']);
    expect(poem.lineThree).toEqual([`syllables`]);
  });

  test('should count total vowels in each word in a line', () => {
    poem.vowelCount();
    expect(poem.syllables[1]).toBe(5);
  });

  test('should reduce vowel count by 1 for words ending in e', ()  => {
    poem.wordSplit();
    poem.silentVowelRemover();
    poem.vowelCount();
    expect(poem.syllables[0]).toBe(4);
    expect(poem.syllables[1]).toBe(4);
    expect(poem.syllables[2]).toBe(3);
  });

  test('should reduce vowel count by 1 for words starting in y', ()  => {
    let poem2 = new Haiku();
    poem2.addPoem( `yellow is my new
favorite color to see
refridgerator`);
    poem2.lineCount();
    poem2.wordSplit();
    poem2.silentVowelRemover();
    poem2.vowelCount();
    expect(poem2.syllables[0]).toBe(5);
    expect(poem2.syllables[1]).toBe(7);
    expect(poem2.syllables[2]).toBe(5);
  });

  test('should decrease vowel count by one for double vowel instances', () => {
    let poem2 = new Haiku();
    poem2.addPoem( `yeellow is my new
favorite color to see
refridgerator`);
    poem2.doubleVowelRemover();
    poem2.lineCount();
    poem2.wordSplit();
    poem2.silentVowelRemover();
    poem2.vowelCount();
    expect(poem2.syllables[0]).toBe(5);
    expect(poem2.syllables[1]).toBe(7);
    expect(poem2.syllables[2]).toBe(5);
  });

  test('should determine whether poem is a haiku', () => {
    let poem2 = new Haiku();
    poem2.addPoem( `yeellow is my new
favorite color to see
refridgerator`);
    poem2.doubleVowelRemover();
    poem2.lineCount();
    poem2.wordSplit();
    poem2.silentVowelRemover();
    poem2.vowelCount();
    poem2.checkHaiku();
    expect(poem2.haiku).toBe(true);
  });

  test('should account for io and eo scenarios in which each vowel forms a syllable', () => {
    let poem2 = new Haiku();
    poem2.addPoem( `if you are not sure
if it is a true ion
we will check for you`);
    poem2.doubleVowelRemover();
    poem2.lineCount();
    poem2.wordSplit();
    poem2.silentVowelRemover();
    poem2.vowelCount();
    poem2.checkHaiku();
    expect(poem2.haiku).toBe(true);
  });

  test('should replace specific two-syllable words with a two-syllable standin word to account for the doublevowelremover function', () => {
    let poem3  = new Haiku();
    poem3.addPoem(`create creator
this is a poem about
our function working`);
    poem3.wordReplacer();
    expect(poem3.poem).toBe(`xoxoxe xoxoxor
this is a xoxox about
our function working`);
  });
});