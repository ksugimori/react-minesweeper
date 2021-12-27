import PointSet from "./PointSet";

describe('PointList', () => {
  describe('#includes', () => {
    test('x, y が一致するものが存在すれば true を返すこと', () => {
      const list = new PointSet()
      list.add({ x: 0, y: 1 })
      list.add({ x: 2, y: 3 })
      list.add({ x: 4, y: 5 })

      expect(list.includes({ x: 2, y: 3 })).toBeTruthy();
    })

    test('x だけが一致するものが存在しても false になること', () => {
      const list = new PointSet()
      list.add({ x: 0, y: 0 })

      expect(list.includes({ x: 0, y: 1 })).toBeFalsy()
    })

    test('y だけが一致するものが存在しても false になること', () => {
      const list = new PointSet()
      list.add({ x: 2, y: 3 })

      expect(list.includes({ x: 10, y: 3 })).toBeFalsy()
    })
  })
});