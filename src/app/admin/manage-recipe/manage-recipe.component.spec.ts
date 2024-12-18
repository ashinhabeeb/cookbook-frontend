import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecipeComponent } from './manage-recipe.component';

describe('ManageRecipeComponent', () => {
  let component: ManageRecipeComponent;
  let fixture: ComponentFixture<ManageRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
