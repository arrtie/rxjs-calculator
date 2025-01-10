/** @format */

import { useEffect, useState } from "preact/hooks";
import { Observable } from "rxjs";

export function useObservable<T>(obs: Observable<T>) {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const subscription = obs.subscribe((val: T) => {
      setValue(val);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [obs]);

  return value;
}
