import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LigazapasyPage } from './ligazapasy.page';

describe('LigazapasyPage', () => {
  let component: LigazapasyPage;
  let fixture: ComponentFixture<LigazapasyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigazapasyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LigazapasyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
