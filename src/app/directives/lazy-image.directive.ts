import { Directive, HostBinding, Input, ElementRef, AfterViewInit, OnInit } from '@angular/core';



@Directive({
  selector: '[appLazyImage]'
})
export class LazyImageDirective implements OnInit, AfterViewInit {
  @HostBinding('attr.src') srcAttr: string = null;
  @Input() src: string;
  @Input() rootMargin: number;

  options: IntersectionObserverInit  = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };


  constructor(private el: ElementRef) {}


  ngOnInit(): void {
    this.options.rootMargin = this.rootMargin ? `${this.rootMargin}px` : '0px';
  }


  /**
   * Waits for view init and fires loading image function
   */
  ngAfterViewInit(): void {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }


  /**
   * Checks browser support for IntersectionObserver
   */
  private canLazyLoad(): boolean {
    return window && 'IntersectionObserver' in window;
  }


  /**
   * Set up a new IntersectionObserver for entity
   * Loads the image if condtions are passing with IntersectionObserver
   */
  private lazyLoadImage(): void {
    let observer: IntersectionObserver;

    observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
    observer.observe(this.el.nativeElement);
  }


  /**
   * Set up a new IntersectionObserver for entity
   * Loads the image if condtions are passing with IntersectionObserver
   *
   * @param list of observer entires
   * @param observer
   */
  private handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach((entrie: IntersectionObserverEntry) => {
      if (entrie.isIntersecting) {
        this.loadImage();
        observer.unobserve(this.el.nativeElement);
      }
    });
  }


  private loadImage(): void {
    this.srcAttr = this.src;
  }
}
