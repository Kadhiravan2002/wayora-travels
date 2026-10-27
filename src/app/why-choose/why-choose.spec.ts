import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyChooseComponent } from './why-choose';

describe('WhyChooseComponent', () => {
  let component: WhyChooseComponent;
  let fixture: ComponentFixture<WhyChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the why choose component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the exact eyebrow and heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eyebrow = compiled.querySelector('.why-choose__eyebrow');
    const heading = compiled.querySelector('.why-choose__heading');

    expect(eyebrow?.textContent?.trim()).toContain('THE WAYORA DIFFERENCE');
    expect(heading?.textContent?.trim()).toBe('Travel planning, made personal.');
  });

  it('should render the exact supporting paragraph', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lead = compiled.querySelector('.why-choose__lead');

    expect(lead?.textContent?.trim()).toBe(
      'Every journey should feel effortless. We help you find experiences that match your interests, pace and travel style.'
    );
  });

  it('should render exactly 4 benefit items with exact titles and descriptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.why-choose__item');
    expect(items.length).toBe(4);

    const expectedBenefits = [
      {
        title: 'Thoughtfully Planned',
        desc: 'Itineraries shaped around your interests, time and travel preferences.',
      },
      {
        title: 'Experiences That Matter',
        desc: 'Discover local culture, memorable landscapes and meaningful moments.',
      },
      {
        title: 'Flexible Travel Options',
        desc: 'Explore ready-made journeys or enquire about a trip tailored to you.',
      },
      {
        title: 'Support Along the Way',
        desc: 'Get help understanding your options before you decide on your journey.',
      },
    ];

    expectedBenefits.forEach((expected, index) => {
      const titleEl = items[index].querySelector('.why-choose__item-title');
      const descEl = items[index].querySelector('.why-choose__item-desc');
      const iconWrap = items[index].querySelector('.why-choose__icon-wrap svg');

      expect(titleEl?.textContent?.trim()).toBe(expected.title);
      expect(descEl?.textContent?.trim()).toBe(expected.desc);
      expect(iconWrap).toBeTruthy();
    });
  });
});
