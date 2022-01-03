import PointSet from "./PointSet";

describe('PointList', () => {
  describe('#includes', () => {
    test('x, y が一致するものが存在すれば true を返すこと', () => {
      const points = new PointSet()
      points.add({ x: 0, y: 1 })
      points.add({ x: 2, y: 3 })
      points.add({ x: 4, y: 5 })

      expect(points.includes({ x: 2, y: 3 })).toBeTruthy();
    })

    test('x だけが一致するものが存在しても false になること', () => {
      const points = new PointSet()
      points.add({ x: 0, y: 0 })

      expect(points.includes({ x: 0, y: 1 })).toBeFalsy()
    })

    test('y だけが一致するものが存在しても false になること', () => {
      const points = new PointSet()
      points.add({ x: 2, y: 3 })

      expect(points.includes({ x: 10, y: 3 })).toBeFalsy()
    })
  })

  describe('#clone', () => {
    test('オブジェクトのコピーが生成されること', () => {
      const original = new PointSet()
      original.add({ x: 1, y: 1 })

      const clone = original.clone();

      expect(clone !== original).toBeTruthy();
      expect(clone.includes({ x: 1, y: 1 })).toBeTruthy()
    })
  })

});