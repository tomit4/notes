data Control
  = Master [Text]
  | Node
  | Reset
  deriving (Eq, Show)

instance Semigroup Control where
  Reset <> _ = Node
  _ <> Reset = Node
  Node <> Node = Node
  Node <> m@(Master _) = m
  m@(Master _) <> Node = m
  (Master m0) <> (Master m1) = Master (m0 <> m1)

-- hello
instance Monoid Control where
  mempty = Node
  mappend a b = a <> b
