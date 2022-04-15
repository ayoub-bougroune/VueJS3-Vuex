import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Todos from '@components/Todos.vue'
import AddTodos from '@components/AddTodos.vue'
import FilterTodos from '@components/FilterTodos.vue'

describe('Todos.vue','AddTodos.vue','FilterTodos.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Todos, AddTodos, FilterTodos, {
      props: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
