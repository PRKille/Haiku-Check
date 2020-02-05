import { Haiku } from './../src/haiku.js';

describe('Haiku', () => {
  let poem;
  beforeEach(() => {
    poem = new Haiku();
    //When poem was tabbed in correctly it created spacing issues in arrays
    poem.addPoem(`this doesn't
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
    expect(poem.lineOne).toEqual([`this`,`doesn't`]);
    expect(poem.lineTwo).toEqual(['have','enough']);
    expect(poem.lineThree).toEqual([`syllables`]);
  });

  test('should count total vowels in each word in a line', () => {
    poem.vowelCount();
    expect(poem.syllables[1]).toBe(5);
  });

  test('should reduce vowel count by 1 for words ending in e', ()  => {
    poem.wordSplit();
    poem.vowelCount();
    poem.silentVowelRemover();
    expect(poem.syllables[0]).toBe(3);
    expect(poem.syllables[1]).toBe(4);
    expect(poem.syllables[2]).toBe(3);
  });

  test('should reduce vowel count by 1 for words starting in y', ()  => {
    let poem = new Haiku();
    poem.addPoem( `yellow is my new
favorite color to see
refridgerator`)
    poem.wordSplit();
    poem.vowelCount();
    poem.silentVowelRemover();
    expect(poem.syllables[0]).toBe(3);
    expect(poem.syllables[1]).toBe(4);
    expect(poem.syllables[2]).toBe(3);
  });


});