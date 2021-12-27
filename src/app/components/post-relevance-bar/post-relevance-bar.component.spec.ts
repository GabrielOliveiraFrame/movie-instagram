import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRelevanceBarComponent } from './post-relevance-bar.component';

describe('PostRelevanceBarComponent', () => {
  let component: PostRelevanceBarComponent;
  let fixture: ComponentFixture<PostRelevanceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRelevanceBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRelevanceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
