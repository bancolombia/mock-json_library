import { from, Observable, switchMap } from 'rxjs';
import { MockJsonSettings } from './mock-json-bancolombia.settings';

export const MockJsonDecorator = (
    settings: MockJsonSettings, 
    mockName: string
) => {
    return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
        if(settings.active){
            descriptor.value = (): Observable<any> => {
                const path = `http://localhost:${settings.servicePort}/${mockName}`;
                return from(fetch(path)).pipe(switchMap(response => response.json()));
            }
        }
        return descriptor;
    }
}