import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Table } from 'antd'
import styles from './TableBlock.less'

/**
 * 对table组件和分页进行封装
 */
class TableBlock extends PureComponent {

  onShowSizeChange = (cur_page, page_size) => {
    const { searchCB } = this.props
    searchCB({ 
      current: 1,
      pageSize: page_size 
    })
  }

  onPageChange = (page) => {
    const { searchCB, paginationProps } = this.props
    const { pageSize } = paginationProps
    searchCB({ 
      current: page,
      pageSize,
    })
  }

  render() {
    const { tableProps, paginationProps, showTopBlock, leftTopNode, 
      showBottomBlock, leftBottomNode } = this.props
    return (
      <Fragment>
        {
          showTopBlock ?
          <div className={styles.between}>
            <div>{ leftTopNode }</div>
            <Pagination 
              className='pagination-right'
              showSizeChanger
              showTotal={total => `共 ${total} 条`} 
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              { ...paginationProps } />
          </div> : null
        }
        <Table bordered pagination={false} { ...tableProps } />
        {
          showBottomBlock ?
          <div className={styles.between}>
            <div>{ leftBottomNode }</div>
            <Pagination 
              className='pagination-right'
              showSizeChanger
              showTotal={total => `共 ${total} 条`}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              { ...paginationProps } />
          </div> : null
        }
      </Fragment>
    )
  }
}

TableBlock.propTypes = {
  tableProps: PropTypes.object.isRequired,
  paginationProps: PropTypes.object.isRequired,
  searchCB: PropTypes.func.isRequired,
}

TableBlock.defaultProps = {
  /**table原生属性 */
  tableProps: {
    /**table数据 */
    dataSource: [],
    /**table头 */
    columns: [],
    /**table每行key值，默认为id */
    rowKey: 'id',
    /**table加载状态 */
    loading: false,
  },
  /**分页原生属性 */
  paginationProps: {
    /**分页总条数 */
    total: 0,
    /**分页页码 */
    current: 1,
    /**分页每页页数 */
    pageSize: 10,
  },
  /**分页查询回调 */
  searchCB: () => {},
  /**是否显示上分页区域 */
  showTopBlock: true,
  /**上分页-左上侧显示内容 */
  leftTopNode: null,
  /**是否显示下分页区域 */
  showBottomBlock: false,
  /**下分页-左下侧显示内容 */
  leftBottomNode: null,
}

export default TableBlock

