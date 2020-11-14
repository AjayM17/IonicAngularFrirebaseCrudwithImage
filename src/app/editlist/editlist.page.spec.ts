import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditlistPage } from './editlist.page';

describe('EditlistPage', () => {
  let component: EditlistPage;
  let fixture: ComponentFixture<EditlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
