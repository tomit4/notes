module Euler.Problem2 where

import Prelude
import Control.Lazy (defer)
import Data.Foldable (sum)
import Data.Int (even)
import Data.List.Lazy (List, filter, takeWhile, (:))

lazyFibList :: Int -> Int -> List Int
lazyFibList f1 f2 = f1 : defer \_ -> lazyFibList f2 (f1 + f2)

solution :: Int
solution = sum $ filter even $ takeWhile (_ < 4_000_000) $ lazyFibList 1 2
