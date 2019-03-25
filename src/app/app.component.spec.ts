import { ComponentFixture } from '@angular/core/testing';
import { TestBed, async } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageCardComponent } from './image-card/image-card.component';
import { LazyImageDirective } from './directives/lazy-image.directive';



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ AppComponent, ImageCardComponent, LazyImageDirective ],
      providers: [ DataService ]
    }).compileComponents();

  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });


  it('should initialize component', function (): void {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {
    it('should call setInitialModel() function', () => {
      spyOn(component, 'setInitialModel');

      component.ngOnInit();

      expect(component.setInitialModel).toHaveBeenCalled();
    });
  });


  describe('setInitialModel()', () => {
    it('should setup data to model', () => {
      const exampleData: any = [{data: 'someData'}];
      spyOn(dataService, 'getImages').and.returnValue(of(exampleData));

      component.setInitialModel();

      expect(component.model).toEqual(exampleData);
    });

    it('should console error on request failure', () => {
      const exampleError: any = [{error: 'someError'}];
      spyOn(dataService, 'getImages').and.returnValue(throwError(exampleError));
      spyOn(console, 'log');

      component.setInitialModel();

      expect(console.log).toHaveBeenCalledWith('Unable to fetch data', exampleError);
    });
  });
});
