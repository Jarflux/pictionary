/**
 * Created by Ben on 16/05/2017.
 */

export enum Metric {
  CORRECT_GUESS_COUNT,
  GUESS_COUNT
}

export module Metric{
  export function* getvalues() {
    yield Metric.CORRECT_GUESS_COUNT;
    yield Metric.GUESS_COUNT;
  }
}
