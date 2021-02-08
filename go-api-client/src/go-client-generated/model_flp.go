/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Describes an intervention or an event that happened.
type Flp struct {
	BytesEquipmentReadOut int64 `json:"bytesEquipmentReadOut"`
	BytesFairMQReadOut int64 `json:"bytesFairMQReadOut"`
	BytesProcessed int64 `json:"bytesProcessed"`
	BytesRecordingReadOut int64 `json:"bytesRecordingReadOut"`
	// Unix timestamp when this entity was created.
	CreatedAt int64 `json:"createdAt,omitempty"`
	Hostname string `json:"hostname"`
	Id int64 `json:"id"`
	NTimeframes int64 `json:"nTimeframes"`
	Name string `json:"name"`
	// Unix timestamp when this entity was last updated.
	UpdatedAt int64 `json:"updatedAt,omitempty"`
}
