import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipesComponent } from './save-recipes.component';

describe('SaveRecipesComponent', () => {
  let component: SaveRecipesComponent;
  let fixture: ComponentFixture<SaveRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
